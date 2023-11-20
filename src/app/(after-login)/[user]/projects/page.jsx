import { Project } from "@/components/Project"
import { SVGProjectsPage } from "@/components/Shapes"

export default function InitialPage({ color }) {

    const projects = [
        {
            id: 1,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [{ id: 1, image: "/next.svg" }],
            percent: 75
        }, {
            id: 2,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [{ id: 1, image: "/next.svg" }, { id: 2, image: "/next.svg" }, { id: 3, image: "/next.svg" }],
            percent: 75
        }, {
            id: 3,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75
        }, {
            id: 4,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        }, {
            id: 5,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        }, {
            id: 6,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 7,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 8,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75
        }, {
            id: 5,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        }, {
            id: 6,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 7,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 8,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75
        }, {
            id: 5,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        }, {
            id: 6,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 7,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 8,
            name: "Projeto A",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75
        }
    ]
    return (
        <div className="h-full flex flex-col justify-center items-center w-screen">
            <SVGProjectsPage />
            <div className=" flex flex-col gap-6 items-center justify-center w-4/5 h-4/5">
                <div className="flex justify-center w-4/5">
                    <h1 className="h1 w-[90%] px-6 text-primary ">Projetos</h1>
                </div>
                <div className="w-4/5 h-[60vh] flex justify-center overflow-y-scroll">
                    <div className=" w-[90%] justify-start flex flex-wrap p-6 gap-y-5 gap-x-12">
                        {projects.map(p => {
                            return <Project project={p} key={p.id} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}