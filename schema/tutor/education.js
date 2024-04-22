
const sql = require('mssql')

const educationSchema = {
    SID: sql.Int(),
    EducationalLevel: sql.VarChar(100),
    EducationalLevelExperience: sql.VarChar(100),
    Bach_College: sql.VarChar(100),
    Bach_College_State: sql.VarChar(100),
    Bach_College_Year: sql.VarChar(100),
    BachCountry: sql.VarChar(100),
    Mast_College: sql.VarChar(100),
    Mast_College_State: sql.VarChar(100),
    Mast_College_StateYear: sql.VarChar(100),
    DoctorateState: sql.VarChar(100),
    DoctorateGradYr: sql.VarChar(100),
    DoctorateCollege: sql.VarChar(100),
    MastCountry: sql.VarChar(100),
    DocCountry: sql.VarChar(100),
    DegCountry: sql.VarChar(100),
    Degree: sql.VarChar(100),
    DegreeState: sql.VarChar(100),
    DegreeYear: sql.VarChar(100),
    Certificate: sql.VarChar(100),
    CertCountry: sql.VarChar(100),
    CertificateState: sql.VarChar(100),
    CertificateExpiration: sql.DateTime(),
    NativeLang: sql.VarChar(100),
    NativeLangState: sql.VarChar(100),
    NativeLangOtherLang: sql.NVarChar(sql.MAX),
    WorkExperience: sql.NVarChar(sql.MAX),
    ThingsReferences: sql.NVarChar(sql.MAX),
    AcademyId: sql.VarChar(100),
    DegreeFile: sql.NVarChar(sql.MAX),
    CertificateFile: sql.NVarChar(sql.MAX),
    Resume: sql.VarChar(100),
    CertFileName: sql.VarChar(100),
    DegFileName: sql.VarChar(100),
};

module.exports = educationSchema




