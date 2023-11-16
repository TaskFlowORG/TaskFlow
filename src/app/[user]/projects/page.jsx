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
                <div className="flex justify-start w-full px-44">
                    <h1 className="h1 text-pink ">Projetos</h1>
                </div>
                <div className="w-4/5 h-[60vh] overflow-y-scroll">
                    <div className="w-full flex flex-col flex-wrap p-6 gap-6">
                        {projects.map(p => {
                            return <Project project={p} key={p.id} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}