

function info() { return `This is the API of a Hackernews Clone`} 

async function feed(parent, args, context) { 
  //def {has to be a where clause} an obj that returns empty obj if no match is founs or an obj
  //with array of data that meet the condition
  //condition expression if arg.filter is true
 //truth-if the dec OR url conatins the filer arg asign it to the filterObj
const where =args.filter
  ?{
   OR:
   [{description:{contains:args.filter}},
     {url:{contains:args.filter}},
      ],
      }
      :{}
      //pass the filtrObj to the finadmany()
      const links =await context.prisma.link.findMany({
   where,
   skip:args.skip,
   take:args.take,
   orderBy:args.orderBy,

 })

  const count=await context.prisma.link.count({where})
return {
    links,//not working as it should returns null list
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
    return context.prisma.user.findUnique({where:{id}})  
    }

    


module.exports={info,  
  all_students,
  all_users,
  search_student,
  search_user,
  feed,
 } 