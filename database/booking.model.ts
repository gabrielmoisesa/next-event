import mongoose, { Schema, type Model, type Types } from 'mongoose';
import { Event } from './event.model';

export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event reference is required'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string): boolean => emailPattern.test(value),
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  },
);

// Booking validation happens before persistence so invalid references are rejected early.
bookingSchema.pre('save', async function (): Promise<void> {
  const existingEvent = await Event.exists({ _id: this.eventId });

  if (!existingEvent) {
    throw new Error('The referenced event does not exist.');
  }
});

export const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ||
  mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
