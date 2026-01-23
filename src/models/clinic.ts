import mongoose, { Schema, Document } from "mongoose";

interface IDoctor {
  name: string;
  regNo: string;
  specialization: string;
}

export interface IClinic extends Document {
  cuc: string;

  clinicName: string;
  clinicType?: string;
  ownerName?: string;
  website?: string;

  dermaCategory: mongoose.Types.ObjectId;

  clinicLogo?: string;
  bannerImage?: string;
  specialOffers?: string[];
  rateCard?: string[];
  photos?: string[];
  videos?: string[];
  certifications?: string[];

  doctors: IDoctor[];

  address: string;
  city?: string;
  services?: string;
  sector?: string;
  pincode?: string;
  mapLink?: string;

  contactNumber?: string;
  whatsapp?: string;
  email: string;
  workingHours?: string;

  licenseNo?: string;
  experience?: string;

  treatmentsAvailable?: string;
  availableServices?: string;

  consultationFee?: string;
  bookingMode?: string;

  clinicDescription?: string;

  instagram?: string;
  linkedin?: string;
  facebook?: string;

  standardPlanLink?: string;

  clinicStatus?: string;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    specialization: { type: String, required: true },
  },
  { _id: false }
);

const ClinicSchema = new Schema<IClinic>(
  {
    cuc: { type: String, required: true, unique: true },

    clinicName: { type: String, required: true },
    clinicType: String,
    ownerName: String,
    website: String,

    dermaCategory: {
      type: Schema.Types.ObjectId,
      ref: "ClinicCategory",
      required: true,
    },

    clinicLogo: String,
    bannerImage: String,
    specialOffers: [String],
    rateCard: [String],
    photos: [String],
    videos: [String],
    certifications: [String],

    doctors: [DoctorSchema],

    address: { type: String, required: true },
    city: String,
    services: String,
    sector: String,
    pincode: String,
    mapLink: String,

    contactNumber: String,
    whatsapp: String,
    email: { type: String, required: true },

    workingHours: String,

    licenseNo: String,
    experience: String,

    treatmentsAvailable: String,
    availableServices: String,

    consultationFee: String,
    bookingMode: String,

    clinicDescription: String,

    instagram: String,
    linkedin: String,
    facebook: String,

    standardPlanLink: String,

    clinicStatus: { type: String, default: "Open" },
  },
  { timestamps: true }
);

export default mongoose.models.Clinic ||
  mongoose.model<IClinic>("Clinic", ClinicSchema);
