

function info() { return `This is the API of a Hackernews Clone`} 

 async function feed(parent, args, context) { 
   const where=args.filter
   ?{
     OR :[
       {description:{contains:args.filter}},
       {url:{contains:args.filter}},
       ],
      }
      :{}
      const links=await context.prisma.link.findMany({
        where,
        skip: args.skip,//sets the starting point.by default skip isset to 0.the beginning
        take: args.take,//its like the size that sets the upper limit
        orderBy: args.orderBy,
        })
        const count = await context.prisma.link.count({ where })

        return {
          
          id: `main-feed:${JSON.stringify(args)}`,
          links,
          count,

        }
}
function all_students (parent, args, context)  {
    return context.prisma.student_info.findMany()
  }

  function all_users(parent,args,context){
    return context.prisma.user.findMany()

  }
  async function search_student(parent,args,context){
    const id= +args.id;
    return context.prisma.student_info.findUnique({
      where:{
        id,
      },
    })  
    }

    async function search_user(parent,args,context){
      const id= +args.id;
      return context.prisma.user.findUnique({
        where:{
          id,
        },
      })  
      }
    
  

  
 

module.exports={info,  
  all_students,
  all_users,
  search_student,
  search_user,
  feed
 } 