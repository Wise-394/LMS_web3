actor {
  public func login(username : Text, password : Text) : async Bool {
    if (username == "student" and password == "student") {
      return true;
    } else {
      return false;
    }
  };
};