import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from './login_idl';

// Create an agent for local development
const agent = new HttpAgent({
  host: process.env.DFX_NETWORK === 'ic' 
    ? 'https://ic0.app' 
    : 'http://localhost:4943',
});

// In development, we need to fetch the root key
if (process.env.NODE_ENV !== 'production') {
  try {
    agent.fetchRootKey().catch(err => {
      console.warn('Unable to fetch root key. Check if your local replica is running');
      console.error(err);
    });
  } catch (e) {
    console.warn('Could not fetch root key:', e);
  }
}

// Get the canister ID from environment variables or use a default for local development
const canisterId = process.env.CANISTER_ID_LMS_WEB3_BACKEND || 'rrkah-fqaaa-aaaaa-aaaaq-cai';

// Create an actor with the login interface
const loginActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export default loginActor; 