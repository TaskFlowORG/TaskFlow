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
            name: "Projeto B",
            description: "Descrição do Projeto A",
            groups: [{ id: 1, image: "/next.svg" }, { id: 2, image: "/next.svg" }, { id: 3, image: "/next.svg" }],
            percent: 75
        }, {
            id: 3,
            name: "Projeto C",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75
        }, {
            id: 4,
            name: "Projeto D",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        }, {
            id: 5,
            name: "Projeto E",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        }, {
            id: 6,
            name: "Projeto F",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 7,
            name: "Projeto G",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 8,
            name: "Projeto H",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75
        }, {
            id: 5,
            name: "Projeto I",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        }, {
            id: 6,
            name: "Projeto J",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 7,
            name: "Projeto K",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 8,
            name: "Projeto L",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75
        }, {
            id: 5,
            name: "Projeto M",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        }, {
            id: 6,
            name: "Projeto N",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 7,
            name: "Projeto O",
            description: "Descrição do Projeto A",
            groups: [],
            percent: 75

        },  {
            id: 8,
            name: "Projeto P",
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
                    <div className="justify-start grid p-6 gap-y-5 gap-x-12">
                        {projects.map(p => {
                            return <Project project={p} key={p.id} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}