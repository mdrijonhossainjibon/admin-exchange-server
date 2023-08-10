export const UserRole = { 
    SuperAdmin : "superadmin",
    Admin : "admin",
    Accountant : "accountant",
    Compliance : "compliance",
    Technical : "technical",
    Support : "support",
    Trader : "trader",
    Member : "member",
    Broker : "broker",
  }
  
  export const ActivityResult = {
    Succeed : "succeed",
    Failed : "failed",
    Denied : "denied",
  }
  
  export const ProfileState = {
    Submitted : "submitted",
    Drafted : "drafted",
    Verified : "verified",
    Rejected : "rejected",
  }
  
  export const LabelKey  = {
    Phone : "phone",
    Document : "document",
    Email : "email",
  }
  
  export const LabelValue = {
    Verified : "verified",
    Rejected : "rejected",
    Submitted : "submitted",
    Pending : "pending",
    Partial : "partial",
  }
  
  export const LabelScope = {
    Private : "private",
    Public : "public",
  }


  
  export const asRole = (roleString) => Object.values(UserRole).find((value) => value === roleString);
  
  export const  UserState = {
    Active : "active",
    Pending : "pending",
    Banned : "banned",
  }
  