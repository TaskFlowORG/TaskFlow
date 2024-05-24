import Image from "next/image";
import { Linkedin } from "../linkedin";
import { Github } from "../Github";
import Link from "next/link";
interface Props {
  name: string;
  description: string;
  links: string[];
}

export const Dev = ({ name, description, links }: Props) => {
  return (
    // <div className="relative dark:bg-modal-grey min-h-[254px] mt-16 min-w-[315px] mb-8 flex flex-col shadowww rounded-lg gap-4 p-6 pt-12 pb-8 max-w-[318px] w-full">
    <div className="relative dark:bg-modal-grey min-h-[235px] mt-16 justify-between min-w-[315px] mb-8 flex flex-col shadowww rounded-lg gap-4 p-6 pt-8 pb-8 max-w-[318px] w-full">
      <div className="w-full h-5 flex justify-end gap-4">
        <h3 className="h3 text-primary dark:text-white flex flex-1 items-center">
          {name}
        </h3>

        <Link
          href={links[0]}
          className="bg-transparent h-full text-[#343434] dark:text-white aspect-square relative"
        >
          <Linkedin />
        </Link>
        <Link
          href={links[1]}
          className="bg-transparent h-full text-[#343434] dark:text-white aspect-square relative"
        >
          <Github />
        </Link>
      </div>
      {/* <div className="h-[92px] w-[92px] bg-white dark:bg-modal-grey absolute centeredAbsoluteTop z-[10] rounded-full shadowww">

            </div> */}
      <p className="text-p h-full    text-modal-grey dark:text-white">
        {description}{" "}
      </p>
    </div>
  );
};
