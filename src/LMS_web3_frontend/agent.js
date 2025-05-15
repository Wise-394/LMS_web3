import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from './login_idl';

const agent = new HttpAgent({ host: 'http://localhost:4943' });

// Replace 'your-canister-id' with the actual canister ID from dfx deploy output
const loginCanisterId = 'uk5da-6iaaa-aaaab-qadja-cai';

const loginActor = Actor.createActor(idlFactory, {
  agent,
  canisterId: loginCanisterId,
});

export default loginActor;
