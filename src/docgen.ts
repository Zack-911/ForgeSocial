import { generateMetadata } from "@tryforge/forgescript"
import { ForgeSocialEventManagerName } from "./constants"

generateMetadata(
    __dirname + "/functions",
    "functions",
    ForgeSocialEventManagerName,
    undefined,
    undefined,
    __dirname + "/events"
)