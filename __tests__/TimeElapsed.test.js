import React from 'react';
import { View, Text } from 'react-native';
import renderer from 'react-test-renderer';

import TimeElapsed from '../src/js/HOCs/TimeElapsed';

describe('TimeElapsed', () => {
  test('exports', () => {
    expect(TimeElapsed).toMatchSnapshot();
  });
  test('renders null with no children', () => {
    // const children = () => <View />;
    const tree = renderer.create(<TimeElapsed start={false} />);
    expect(JSON.stringify(tree)).toEqual('null');
  });

  test('renders and accepts children as callable function', () => {
    // eslint-disable-next-line react/prop-types
    const children = ({ secondsElapsed }) => {
      return (
        <Text>
          {JSON.stringify({
            secondsElapsed
          })}
        </Text>
      );
    };
    const tree = renderer.create(
      <TimeElapsed start={false}>
        {children}
      </TimeElapsed>
    );
    expect(tree).toMatchSnapshot();
  });

  test('renders and accepts children as React Class Component', () => {
    class CompChildren extends React.Component {
      render() {
        // eslint-disable-next-line react/prop-types
        const { secondsElapsed } = this.props;
        return (
          <Text>
            {JSON.stringify({
              secondsElapsed
            })}
          </Text>
        );
      }
    }

    const tree = renderer.create(
      <TimeElapsed start={false}>
        <CompChildren />
      </TimeElapsed>
    );
    expect(tree).toMatchSnapshot();
  });

  test('same ui tree if component or function', () => {
    // eslint-disable-next-line react/prop-types
    const children = ({ secondsElapsed }) => {
      return (
        <Text>
          {JSON.stringify({
            secondsElapsed
          })}
        </Text>
      );
    };

    class CompChildren extends React.Component {
      render() {
        // eslint-disable-next-line react/prop-types
        const { secondsElapsed } = this.props;
        return (
          <Text>
            {JSON.stringify({
              secondsElapsed
            })}
          </Text>
        );
      }
    }

    const withClass = renderer.create(
      <TimeElapsed start={false}>
        <CompChildren />
      </TimeElapsed>
    );

    const withFunction = renderer.create(
      <TimeElapsed start={false}>
        {children}
      </TimeElapsed>
    );

    expect(JSON.stringify(withClass)).toEqual(JSON.stringify(withFunction));
  });
});