

function info() { return `This is the API of a Hackernews Clone`} 

function feed(parent, args, context) {
  const where =args.filter//if no filter/input arg is provide the returned obj will be empty
  ?{
    OR:[
      {description:{contains:args.filter}},
      {url:{contains:args.filter}},

    ],
  }
  :{}
  const links=await context.prisma.link.findMany({
      where,
  })
  return links
}

function all_students (parent, args, context)  {
    return context.prisma.student_info.findMany()
  }

  function all_users(parent,args,context){
    return context.prisma.user.findMany()

  }
  function search_student(parent,args,context){
    return context.prisma.student_info.findMany({ where:{id:args.id}})   
    .then(posts=>posts[0])    

    }
  function search_user(parent,args,context){
    return context.prisma.user.findMany({where:{id:args.id}})
    .then(posts=>posts[0])// grabbing the first item in the array and 
    //returning that in your resolver instead of unpacking the array to access the object with the data we looking for
    }

  
 

module.exports={info,
  feed,
  all_students,
  all_users,
  search_student,
  search_user
 } 