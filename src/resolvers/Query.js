

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
  function search_student(parent,args,context){
    return context.prisma.student_info.findMany({ where:{id:args.id}})   
    .then(posts=>posts[0])    //not working

    }
  function search_user(parent,args,context){
    return context.prisma.user.findMany({where:{id:args.id}})
    .then(posts=>posts[0])//not working  grabbing the first item in the array and 
    //returning that in your resolver instead of unpacking the array to access the object with the data we looking for
    }

  
 

module.exports={info,  
  all_students,
  all_users,
  search_student,
  search_user,
  feed
 } 