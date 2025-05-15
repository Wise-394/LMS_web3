import { IDL } from '@dfinity/candid';

export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'login': IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], [])
  });
}; 