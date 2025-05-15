import { IDL } from '@dfinity/candid';

export const idlFactory = ({ IDL }) => {
  const Role = IDL.Variant({
    'student': IDL.Null,
    'teacher': IDL.Null,
    'admin': IDL.Null
  });

  const Result = IDL.Variant({
    'ok': IDL.Text,
    'err': IDL.Text
  });

  return IDL.Service({
    'register': IDL.Func([IDL.Text, IDL.Text, Role], [Result], []),
    'login': IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'validateSession': IDL.Func([IDL.Text], [IDL.Bool], []),
    'logout': IDL.Func([IDL.Text], [], []),
    'getUserRole': IDL.Func([IDL.Text], [Result], [])
  });
};