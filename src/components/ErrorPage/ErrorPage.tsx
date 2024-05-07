import { ErrorComponent } from "next/dist/client/components/error-boundary";

export const ErrorPage:ErrorComponent = ({ error, reset }) => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
        </div>
    );
}