

function info() { return `This is the API of a Hackernews Clone`} 

function feed(parent, args, context) {
    return context.prisma.link.findMany()
}

function all_students (parent, args, context)  {
    return context.prisma.student_info.findMany()
  }

  function all_users(parent,args,context){
    return context.prisma.user.findMany()

  }
  function search_student(parent,args,context){
    return context.prisma.student_info.findMany({ where:{id:args.id}})   

    }
  function search_user(parent,args,context){
    return context.prisma.user.findUnique({where:{id:args.id}})
  }
  
 

module.exports={info,feed,all_students,all_users} 