import {
  Badge,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import { AppMessage } from './app-message';
import { ThemeToggle } from './theme-toggle';

export default function Index() {
  return (
    <Section size="3">
      <Container size="3">
        <Flex direction="column" gap="6">
          <Flex align="start" justify="between" gap="4" wrap="wrap">
            <Flex direction="column" gap="2">
              <Badge color="green" size="2" variant="soft">
                Frontend
              </Badge>
              <Heading as="h1" size="8" className="hero-title">
                Mentara OE
              </Heading>
              <Text color="gray" size="3">
                Radix Themes now drives the application styling and appearance.
              </Text>
            </Flex>
            <ThemeToggle />
          </Flex>

          <Card size="3" className="intro-card">
            <Flex direction="column" gap="3">
              <Text weight="medium" size="4">
                API Connection Status
              </Text>
              <Text size="3" color="gray">
                This panel keeps the existing backend connectivity check visible.
              </Text>
              <AppMessage />
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Section>
  );
}
