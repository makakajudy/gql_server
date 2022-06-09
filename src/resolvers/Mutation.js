const bcrypt = require('bcryptjs')
//const { SchemaMetaFieldDef } = require('graphql')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)
  
    // 2
    const user = await context.prisma.user.create({ data: { ...args, password } })
  
    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 4
    return {
      token,
      user,
    }
  }
  
  async function login(parent, args, context, info) {
    // 1
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
  }
  async function add_link(parent, args, context, info) {
    const { userId } = context;
  
    const newLink = await context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      }//is working have to add a user first and pass the token to the 
      //http header the format Authotization : toke without quotes
    })
    context.pubsub.publish("NEW_LINK",newLink)
    return newLink
  }
  async function add_student(parent, args,context,info)  {     
    return await context.prisma.student_info.create({
      data:{
        name:args.name,
        age:args.age,
      }
    })
   }
   
  async function vote(parent, args, context, info) {
    // 1
    const userId = context.userId
  
    // 2
    const vote = await context.prisma.vote.findUnique({
      where: {
        linkId_userId: {
          linkId: Number(args.linkId),
          userId: userId
        }
      }
    })
  
    if (Boolean(vote)) {
      throw new Error(`Already voted for link: ${args.linkId}`)
    }
  
    // 3
    const newVote = context.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: Number(args.linkId) } },
      }
    })
    context.pubsub.publish("NEW_VOTE", newVote)
  
    return newVote
  }

  

  
 
   module.exports = {
    signup,
    login,
    add_link,
    add_student,
    vote,
    
    
    
    
  }
