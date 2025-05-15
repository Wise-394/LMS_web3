import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Hash "mo:base/Hash";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor LoginManager {
  // Types
  type UserId = Text;
  type Role = {
    #student;
    #teacher;
    #admin;
  };

  type User = {
    id: UserId;
    username: Text;
    passwordHash: Text;
    role: Role;
    createdAt: Int;
    lastLogin: ?Int;
  };

  type Session = {
    userId: UserId;
    token: Text;
    expiresAt: Int;
  };

  // State
  private stable var userEntries : [(UserId, User)] = [];
  private stable var sessionEntries : [(Text, Session)] = [];
  
  private let users = HashMap.HashMap<UserId, User>(0, Text.equal, Text.hash);
  private let sessions = HashMap.HashMap<Text, Session>(0, Text.equal, Text.hash);

  // Constants
  private let SESSION_DURATION_NANOS = 24 * 60 * 60 * 1000000000; // 24 hours in nanoseconds
  
  // Helper Functions
  private func generateId() : Text {
    // Simple ID generation - in production use a proper UUID
    Int.toText(Time.now()) # Int.toText(Nat.fromText(Principal.toText(Principal.caller())))
  };

  private func hashPassword(password : Text) : Text {
    // In production, use proper password hashing
    // This is just a simple simulation
    Text.hash(password)
  };

  private func generateSessionToken(userId : Text) : Text {
    // In production, use proper token generation
    Text.hash(userId # Int.toText(Time.now()))
  };

  private func isValidSession(token : Text) : Bool {
    switch (sessions.get(token)) {
      case (null) { false };
      case (?session) {
        if (Time.now() > session.expiresAt) {
          sessions.delete(token);
          false
        } else {
          true
        }
      };
    };
  };

  // Public Functions
  public shared(msg) func register(username : Text, password : Text, role : Role) : async Result<Text, Text> {
    // Check if username already exists
    for ((_, user) in users.entries()) {
      if (user.username == username) {
        return #err("Username already exists");
      };
    };

    let userId = generateId();
    let passwordHash = hashPassword(password);
    
    let newUser : User = {
      id = userId;
      username = username;
      passwordHash = passwordHash;
      role = role;
      createdAt = Time.now();
      lastLogin = null;
    };

    users.put(userId, newUser);
    #ok("User registered successfully")
  };

  public shared(msg) func login(username : Text, password : Text) : async Result<Text, Text> {
    var foundUser : ?User = null;
    
    // Find user by username
    for ((_, user) in users.entries()) {
      if (user.username == username) {
        foundUser := ?user;
        break;
      };
    };

    switch (foundUser) {
      case (null) { #err("User not found") };
      case (?user) {
        if (user.passwordHash == hashPassword(password)) {
          let token = generateSessionToken(user.id);
          let session : Session = {
            userId = user.id;
            token = token;
            expiresAt = Time.now() + SESSION_DURATION_NANOS;
          };
          
          sessions.put(token, session);
          
          // Update last login
          let updatedUser : User = {
            id = user.id;
            username = user.username;
            passwordHash = user.passwordHash;
            role = user.role;
            createdAt = user.createdAt;
            lastLogin = ?Time.now();
          };
          users.put(user.id, updatedUser);
          
          #ok(token)
        } else {
          #err("Invalid password")
        }
      };
    };
  };

  public shared(msg) func validateSession(token : Text) : async Bool {
    isValidSession(token)
  };

  public shared(msg) func logout(token : Text) : async () {
    sessions.delete(token);
  };

  public shared(msg) func getUserRole(token : Text) : async Result<Role, Text> {
    if (not isValidSession(token)) {
      return #err("Invalid or expired session");
    };

    switch (sessions.get(token)) {
      case (null) { #err("Session not found") };
      case (?session) {
        switch (users.get(session.userId)) {
          case (null) { #err("User not found") };
          case (?user) { #ok(user.role) };
        };
      };
    };
  };

  // System Functions
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
    sessionEntries := Iter.toArray(sessions.entries());
  };

  system func postupgrade() {
    users = HashMap.fromIter<UserId, User>(userEntries.vals(), 0, Text.equal, Text.hash);
    sessions = HashMap.fromIter<Text, Session>(sessionEntries.vals(), 0, Text.equal, Text.hash);
  };
}