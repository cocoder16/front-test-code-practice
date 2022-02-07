import { merge } from "lodash";

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // use process.env
  require("dotenv").config();
  config.env = merge(config.env, process.env);

  if (config.testingType === "component") {
    // 컴포넌트 유닛 테스팅
    require("@cypress/react/plugins/react-scripts")(on, config);
  }

  if (config.testingType === "e2e" && config.env.npm_lifecycle_event === "cy:open") {
    // cypress open은 test file이 변경되면 테스트를 rerun하는데 application file이 변경되면 테스트를 rerun하지 않음.
    // application code가 변경될 때도 테스트를 rerun 해주는 플러그인임.
    // 이거 포트가 정해진 값만 써서, open으로 켜놓고 있으면 다른 유닛테스트나 cy:run 할 때, 포트 충돌 에러나므로 조건문 처리
    require("cypress-watch-and-reload/plugins")(config);
  }

  return config;
};
