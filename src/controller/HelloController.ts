import { Get, Query, Route, Tags } from "tsoa";
import { LogSuccess } from "../utils/logger";
import { IHelloController } from "./interfaces";
import { BasicResponse } from "./types";

@Route("api/hello")
@Tags("HelloController")
export class HelloController implements IHelloController{
    /**
     * Endpoint to retrieve a Message "Hello {name}" in JSON
     * @param name {srting | undefined} Name of user to be greeted
     * @returns {BasicResponse} Promise of BasicResponse
     */
    @Get("/")
    async getMessage(@Query()name?: string): Promise<BasicResponse> {

        LogSuccess('[/api/hello] Get Request')

        return {
            message: `Hello, ${name || 'Wolrd!'}`
        }
    }
    
}