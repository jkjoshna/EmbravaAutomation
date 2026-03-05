import {
  Reporter,
  TestCase,
  TestResult,
  Suite,
  FullConfig
} from '@playwright/test/reporter';

class CustomReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log('Starting test suite:', suite.title);
  }

  onTestBegin(test: TestCase) {
    console.log('Starting test:', test.title);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log('Finished test:', test.title);
    console.log('Status:', result.status);

    if (result.error) {
      console.error('Error:', result.error.message);
    }
  }

  onEnd() {
    console.log('All tests finished.');
  }
}

export default CustomReporter;
