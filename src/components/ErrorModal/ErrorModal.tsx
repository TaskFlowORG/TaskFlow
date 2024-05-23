import { Button } from "../Button";
import { If } from "../If";
import { CenterModal } from "../Modal";

interface ErrorModalProps {
  condition: boolean;
  setCondition: (value: boolean) => void;
  fnOk: () => void;
  fnCancel?: () => void;
  title: string;
  message: string;
  txtOk?: string;
  txtCancel?: string;
}

export const ErrorModal = ({
  condition,
  setCondition,
  fnOk,
  fnCancel,
  title,
  message,
  txtOk,
  txtCancel,
}: ErrorModalProps) => {
  return (
    <CenterModal condition={condition} setCondition={setCondition}>
      <div className="w-full p-4 h-60 flex flex-col justify-between">
        <div className="flex flex-col gap-4 px-8">
          <h4 className="w-full text-center text-h4 text-primary">{title}</h4>
          <p className="w-full text-center">{message}</p>
        </div>
        <span
          className={
            "flex w-full " + (fnCancel ? " justify-between" : "justify-center")
          }
        >
          <If condition={fnCancel != undefined}>
            <Button
              fnButton={fnCancel}
              paddingY="py-1"
              text={txtCancel ?? "Cancel"}
            />
          </If>
          <Button fnButton={fnOk} paddingY="py-1" text={txtOk ?? "OK"} />
        </span>
      </div>
    </CenterModal>
  );
};
