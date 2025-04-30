import {httpRouter} from 'convex/server'
import {httpAction} from './_generated/server'
import {Webhook} from 'svix'
import {api} from './_generated/api'

const http = httpRouter()

http.route({
  path:'/clerk-webhook',
  method:'POST',
  handler: httpAction(async (ctx,request)=>{
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
    if(!webhookSecret){
      throw new Error('Webhook secret not set')
    }
    const svixId = request.headers.get('svix-id')
    const svixSignature = request.headers.get('svix-signature')
    const svixTimestamp = request.headers.get('svix-timestamp')

    if(!svixId || !svixSignature || !svixTimestamp){
      return new Response('Missing headers', {
        status: 400
      })
    }

    const payload = await request.json()
    const body = JSON.stringify(payload)
    const webhook = new Webhook(webhookSecret)
    let evt : any
    try {
      evt = webhook.verify(body, {
        "svix-id"       : svixId,
        "svix-signature": svixSignature,
        "svix-timestamp": svixTimestamp
      })
    }
    catch ( e ){
      console.error("Error verifying webhook", e)
      return new Response('Missing headers', {
        status: 400
      })
    }

    const eventType = evt.type

    if(eventType === 'user.created'){
      const {id,email_addresses,first_name,last_name,image_url} = evt.data
      const email = email_addresses[0].email_address
      const name = `${first_name ?? ''} ${last_name ?? ''}`.trim()

      try {
        await ctx.runMutation(api.users.createUser,{
          username: email.split('@')[0],
          fullname: name,
          image:image_url,
          email:email,
          authId: id,
        })
      }
      catch ( e ) {
        console.error("Error creating user", e)
        return new Response('Missing headers', {
          status: 500
        })
      }
    }

    return new Response('OK', { status: 200 })
  })
})

export default http
