const{PrismaClient}=require("@prisma/client")

const prisma=new PrismaClient()

async function main(){
    //all queries go here
    
    const newLink = await prisma.link.create({
        data: {
          description: 'Fullstack tutorial for GraphQL',
          url: 'www.howtographql.com',
        },
      })
      const newStudent_info = await prisma.student_info.create({
        data: {
          name: 'jud makaka',
          age: 3,
        },
      })


    const allLinks=await prisma.link.findMany()
    console.log(allLinks)
    const allStudents=await prisma.student_info.findMany()
    console.log(allStudents)
}

main()
.catch(e=>{
    throw e
})

.finally(async()=>{
    await prisma.$disconnect()
})