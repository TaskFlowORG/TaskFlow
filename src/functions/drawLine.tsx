import { Point } from "@/types/Point";

type Draw = {
    ctx: CanvasRenderingContext2D;
    currentPoint: Point;
    prevPoint: Point | null;
  };

let lineWidth = 5;
let lineColor = "#000000";

export function setLineColor(color: string) {
  lineColor = color;
}

export function setLineWidth(width: number) {
  lineWidth = width;
}

export function drawLine ({ prevPoint, currentPoint, ctx }: Draw, shape:string, isErasing:boolean) {
    let { x: currX, y: currY } = currentPoint;
    let { x: prevX, y: prevY } = prevPoint ?? currentPoint;
    //Diference because the size of cursor
    prevY += 20;
    currY += 20;

    if (isErasing) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }

     ctx.lineWidth = lineWidth;
     ctx.strokeStyle = lineColor;
    ctx.beginPath();

    if (shape == "square") {
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, prevY);
      ctx.lineTo(currX, currY);
      ctx.lineTo(prevX, currY);
      ctx.lineTo(prevX, prevY);
      ctx.lineTo(currX, prevY);
      ctx.stroke();
    } else if (shape == "circle") {
      if (currX > prevX && currY > prevY) {
        const center = { x: prevX + ((currX - prevX) / 2), y: prevY + ((currY - prevY) / 2) }
        ctx.ellipse(center.x, center.y, (currX - prevX) / 2, (currY - prevY) / 2, 0, 0, 2 * Math.PI);
      } else if (currX > prevX && currY < prevY) {
        const center = { x: prevX + ((currX - prevX) / 2), y: currY + ((prevY - currY) / 2) }
        ctx.ellipse(center.x, center.y, (currX - prevX) / 2, (prevY - currY) / 2, 0, 0, 2 * Math.PI);
      } else if (currX < prevX && currY > prevY) {
        const center = { x: currX + ((prevX - currX) / 2), y: prevY + ((currY - prevY) / 2) }
        ctx.ellipse(center.x, center.y, (prevX - currX) / 2, (currY - prevY) / 2, 0, 0, 2 * Math.PI);
      } else if (currX < prevX && currY < prevY) {
        const center = { x: currX + ((prevX - currX) / 2), y: currY + ((prevY - currY) / 2) }
        ctx.ellipse(center.x, center.y, (prevX - currX) / 2, (prevY - currY) / 2, 0, 0, 2 * Math.PI);
      } else {
        ctx.ellipse(prevX, prevY, (currX - prevX) / 2, (currY - prevY) / 2, 0, 0, 2 * Math.PI);
      }
      ctx.stroke();
    } else if (shape == "triangle") {
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, prevY);
      ctx.lineTo(prevX + ((currX - prevX) / 2), currY);
      ctx.lineTo(prevX, prevY);
      ctx.lineTo(currX, prevY);
      ctx.stroke();
    } else if (shape == "line") {
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.stroke();
    }
     ctx.fillStyle = lineColor;
    ctx.beginPath();
    if (shape == "line") {
      ctx.arc(
        prevX,
        prevY,
         lineWidth / 2,
        0,
        (lineWidth / 2) * Math.PI
      );
    }
    ctx.fill();

  }