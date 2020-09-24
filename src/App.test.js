import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import logo from './HomePage.png';

// Enzyme is a testing tool by Airbnb and is used with Jest to provide easy support for testing our
// React apps. To use enzyme, always import the below statements.
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
// configure is to cinfigure our enzyme.
// shallow is a function from enzyme which will create instance of our component.

// We will work here with the help of Test Driven Development, which means first we will make the test
// fail and afterwards we make it pass by writing correct code or passing correct params.

// We write all the test cases in the describe method.

describe('App Testing', () => {

  // beforeEach() function: runs a function before each of the tests in this file runs. If the function 
  // returns a promise or is a generator, Jest waits for that promise to resolve before running the test.
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App/>);
  })

  test('renders the title of page', () => {
    // const wrapper = shallow(<App/>);

    // shallow returns the component in the wrapper. it can be any variable name but we usually use wrapper
    // shallow will never render the children of the given component. Here shallow will not render Search
    // With the help of wrapper, we can grab the elemnt by className, id or the tag name.
    console.log(wrapper.debug()); // it prints everything inside the <App> component.
    expect(wrapper.find('h1').text()).toContain('Cinemaite');
    // it will grab the <h1> tag and check if the text inside the <h1> tag is equal to Cinemaite or not.
  });

  test('Label of toggle botton', () => {
      // const wrapper = shallow(<App/>);
      expect(wrapper.find('.mode').text()).toBe('Dark Theme');
  });

  test('Checking the checkbox for toggle', () => {
      // const wrapper = shallow(<App/>);
      expect(wrapper.find('#toggle').type()).toEqual('input');
  });

  test('Checking the logo', () => {
    // const wrapper = shallow(<App/>);
    expect(wrapper.find('img').prop('src')).toEqual(logo);
  });

  // Here we are using wrapper again and again, so now we will take it out and keep it in a separate
  // function. And that function will be beforeEach()

  test('Checking span for toggle', () => {
    expect(wrapper.find('.slider.round').type()).toEqual('span');
  })

  // test('checking the click behavior of toggle button', () => {
  //   wrapper.find('#toggle').simulate('click');

  // })

})