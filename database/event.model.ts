import mongoose, { Schema, type Model } from 'mongoose';

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const normalizeTime = (value: string): string => {
  const trimmed = value.trim();
  const timeMatch = trimmed.match(/^(\d{1,2})\s*:\s*(\d{2})\s*(AM|PM)?$/i);

  if (!timeMatch) {
    throw new Error('Invalid time format. Use a value like 09:30 or 5:30 PM.');
  }

  const [, rawHour, rawMinute, meridiem] = timeMatch;
  let hours = Number(rawHour);
  const minutes = Number(rawMinute);

  if (minutes < 0 || minutes > 59) {
    throw new Error('Minutes must be between 00 and 59.');
  }

  if (meridiem) {
    if (hours < 1 || hours > 12) {
      throw new Error('Hours must be between 1 and 12 when using AM/PM.');
    }

    const upperMeridiem = meridiem.toUpperCase();

    if (upperMeridiem === 'AM') {
      hours = hours === 12 ? 0 : hours;
    }

    if (upperMeridiem === 'PM') {
      hours = hours === 12 ? 12 : hours + 12;
    }
  } else if (hours < 0 || hours > 23) {
    throw new Error('Hours must be between 0 and 23 for 24-hour time.');
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const normalizeDate = (value: string): string => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error('Invalid event date. Use a valid ISO date string.');
  }

  return parsedDate.toISOString().slice(0, 10);
};

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Title cannot be empty',
      },
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Slug is required'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Description cannot be empty',
      },
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Overview cannot be empty',
      },
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Image cannot be empty',
      },
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Venue cannot be empty',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Location cannot be empty',
      },
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Date cannot be empty',
      },
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Time cannot be empty',
      },
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Mode cannot be empty',
      },
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Audience cannot be empty',
      },
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (value: string[]): boolean => value.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => value.trim().length > 0,
        message: 'Organizer cannot be empty',
      },
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (value: string[]): boolean => value.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  {
    timestamps: true,
  },
);

// Slug generation keeps URLs stable and readable while still allowing easy updates.
eventSchema.pre('validate', function (): void {
  // Only regenerate the slug when the title changes; otherwise we avoid needless rewrites.
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title);
  }

  // Normalize event dates and times before persisting to keep stored values consistent.
  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);
});

export const Event: Model<IEvent> =
  (mongoose.models.Event as Model<IEvent>) ||
  mongoose.model<IEvent>('Event', eventSchema);

export default Event;
