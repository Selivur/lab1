import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../src/my_project_backend/src/index";

const agent = new HttpAgent();
const todo_backend_canister_id = "YOUR_CANISTER_ID";  // заміни на свій canister ID

const todo_backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: todo_backend_canister_id,
});

export { todo_backend };