# Dynamic Content Translation Guide

This guide explains how to translate dynamic content (variables, dates, numbers, API data) in your multilingual application.

## 1. Basic Interpolation

Use `{{variable}}` syntax in your translation strings to insert dynamic values.

### Translation Files

```json
{
  "dynamic": {
    "greeting": "Hello, {{name}}!",
    "upcomingEvent": "Next event: {{eventName}} on {{date}}"
  }
}
```

### Component Usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  const userName = 'John';

  return <p>{t('dynamic.greeting', { name: userName })}</p>;
  // Output: "Hello, John!"
}
```

## 2. Date and Time Formatting

Use the JavaScript `Intl.DateTimeFormat` API for locale-aware date formatting.

```tsx
const { t, i18n } = useTranslation();

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const eventDate = new Date('2025-09-05');
t('dynamic.upcomingEvent', {
  eventName: 'Ganesh Chaturthi',
  date: formatDate(eventDate),
});
```

**Output:**

- English: "Next event: Ganesh Chaturthi on September 5, 2025"
- Hindi: "अगला कार्यक्रम: Ganesh Chaturthi, ५ सितंबर २०२५ को"
- Kannada: "ಮುಂದಿನ ಕಾರ್ಯಕ್ರಮ: Ganesh Chaturthi, ಸೆಪ್ಟೆಂಬರ್ 5, 2025 ರಂದು"

## 3. Number and Currency Formatting

Use `Intl.NumberFormat` for numbers and currencies.

```tsx
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

t('dynamic.donationAmount', {
  amount: formatCurrency(50000),
});
```

**Output:**

- English: "Total donations: ₹50,000.00"
- Hindi: "कुल दान: ₹50,000.00"
- Kannada: "ಒಟ್ಟು ದಾನ: ₹50,000.00"

## 4. Pluralization

i18next supports automatic pluralization based on count.

### Translation Files

```json
{
  "dynamic": {
    "devoteeCount": "{{count}} devotee visited today",
    "devoteeCount_plural": "{{count}} devotees visited today"
  }
}
```

### Component Usage

```tsx
t('dynamic.devoteeCount', { count: 1 });
// "1 devotee visited today"

t('dynamic.devoteeCount', { count: 150 });
// "150 devotees visited today"
```

## 5. Translating API/Database Content

For content from APIs or databases, you have two approaches:

### Approach 1: Store translations in your database

```tsx
interface Event {
  id: string;
  nameEn: string;
  nameHi: string;
  nameKn: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionKn: string;
}

function EventCard({ event }: { event: Event }) {
  const { i18n } = useTranslation();

  const getName = () => {
    switch (i18n.language) {
      case 'hi':
        return event.nameHi;
      case 'kn':
        return event.nameKn;
      default:
        return event.nameEn;
    }
  };

  return <h3>{getName()}</h3>;
}
```

### Approach 2: Use translation keys for predefined content

```json
{
  "events": {
    "ganeshChaturthi": "Ganesh Chaturthi",
    "diwali": "Diwali Puja"
  }
}
```

```tsx
interface Event {
  id: string;
  translationKey: string; // "events.ganeshChaturthi"
  date: Date;
}

function EventCard({ event }: { event: Event }) {
  const { t } = useTranslation();

  return (
    <div>
      <h3>{t(event.translationKey)}</h3>
      <p>{formatDate(event.date)}</p>
    </div>
  );
}
```

## 6. Context-based Translation

For words that change meaning based on context:

```json
{
  "book": "Book",
  "book_verb": "Book an appointment",
  "book_noun": "Read a book"
}
```

```tsx
t('book', { context: 'verb' }); // "Book an appointment"
t('book', { context: 'noun' }); // "Read a book"
```

## 7. Best Practices

1. **Always use Intl API** for dates, numbers, and currencies
2. **Keep translation keys organized** by feature or page
3. **Use descriptive keys** instead of generic ones
4. **Test with real data** in all languages
5. **Handle missing translations** gracefully

```tsx
// Good
t('events.ganeshChaturthi.title');

// Avoid
t('title1');
```

## 8. Example Component

See [DynamicContentExample.tsx](vsls:/src/components/DynamicContentExample.tsx) for a complete working example.

You can add it to any page:

```tsx
import DynamicContentExample from '@/components/DynamicContentExample';

export default function Page() {
  return (
    <DynamicContentExample
      userName='Ram'
      devoteeCount={250}
      eventName='Ganesh Chaturthi'
      eventDate={new Date('2025-09-05')}
      donationAmount={75000}
    />
  );
}
```
