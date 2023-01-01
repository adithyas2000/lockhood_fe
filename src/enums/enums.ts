export enum ResponseStatus {
  SUCCESS = "Success",
  FAILED = "Failed",
}
export enum ErrorMessages {
  INVALID_REQUEST = "Invalid Request",
  USER_DOES_NOT_EXIST = "User does not exist",
  EMPTY_INPUT_FIELDS = "please fill all the input fields",
  INVALID_CREDENTIALS = "Invalid user name or password",
  REQUEST_TO_LOGIN = "Please login to continue!!",
  INVALID_PASSWORD = "Invalid current password",
  INVALID_TOKEN = "Unauthorized access",
  UNAUTHORIZED_USER = "Unauthorized user",
  TOKEN_EXPIRED = "Token expired",
  INTERNAL_SERVER_ERROR = "Internal server error",
}

export enum Departments {
  HRD = "Human Resource Management Department",
  RDD = "Research and Development Department",
  SMD = "Sales & Marketing Department",
  PD = "Purchasing Department",
  FD = "Finanse Department",
  ITD = "Information and Technology Department",
  EDD = "Engineering Design Department",
  ED = "Engineering Department",
  FMD = "Factory Management Department",
  HM = "Higher Management",
}
export enum Units {
  LBU = "Lock Barrel",
  KSU = "Key Setting",
  LAU = "Lock Assembly",
  LMU = "Lock Machining",
  MU = "Moulding",
  EEU = "Electrical and Electronics",
  RDW = "R and D workshop",
  FU = "Fabrication",
  PCTU = "Painting and Chemical Treatment",
  WHU = "Warehouse Unit",
}

export enum DepartmentsCode {
  HRD = "HRD",
  RDD = "RDD",
  SMD = "SMD",
  PD = "PD",
  FD = "FD",
  ITD = "ITD",
  EDD = "EDD",
  ED = "ED",
  FMD = "FMD",
  HM = "HM",
}
export enum UnitsCodes {
  LBU = "LBU",
  KSU = "KSU",
  LAU = "LAU",
  LMU = "LMU",
  MU = "MU",
  EEU = "EEU",
  RDW = "RDW",
  FU = "FU",
  PCTU = "PCTU",
  WHU = "WHU",
}

export enum JobStatus {
  BACKLOG = "backlog",
  INPROGRESS = "inprogress",
  TESTING = "testing",
  DONE = "done",
}

export enum Designation {
  SUPERVISOR = "supervisor",
  EMPLOYEE = "employee",
}
