// This implementation is based on Storybook's addons/docs/src/blocks/DocsStory.tsx

import { Anchor, Description, DocsStoryProps, Story, Subheading } from '@storybook/addon-docs';
import * as React from 'react';
import {
  githubLightTheme,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  SandpackThemeProvider,
  useSandpack,
} from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';
import * as dedent from 'dedent';
import newGithubIssueUrl from 'new-github-issue-url';
import * as packageJson from '../../package.json';
import bugReportTemplate from '../../../../.github/ISSUE_TEMPLATE/bug_report_v9.md';

const removeStoryConfiguration = (storyName: string, fullSource: string) => {
  const regex = new RegExp(`${storyName}\.parameters = {.*};`, 's');
  return fullSource.replace(regex, '').trim();
};

const handleReportBug = (componentName: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => async (
  e: React.MouseEvent,
) => {
  // create codesandbox
  let codesandboxUrl = '';
  const openInCSButton = e.currentTarget.nextElementSibling;
  const codesandboxForm = openInCSButton?.querySelector('form');
  if (codesandboxForm) {
    const codesandboxFormData = new FormData(codesandboxForm);
    codesandboxFormData.append('json', '1');
    const codesandboxResponse = await fetch(codesandboxForm.action, {
      method: 'post',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      body: new URLSearchParams(codesandboxFormData),
    });

    setLoading(true);
    const sandboxId = (await codesandboxResponse.json()).sandbox_id;
    setLoading(false);
    codesandboxUrl = `https://codesandbox.io/s/${sandboxId}?file=/example.tsx`;
  }

  // open GitHub
  const newIssueUrl = newGithubIssueUrl({
    repoUrl: packageJson.repository.url,
    title: '',
    labels: ['Type: Bug :bug:', 'Fluent UI vNext', componentName ? `Component: ${componentName}` : ''],
    template: `bug_report_v9_${componentName}_permit.md`,
    body: bugReportTemplate
      .replace('[package-versions]', packageJson.version)
      .replace('[browser-and-os-versions]', navigator.userAgent)
      .replace('[link-to-codesandbox]', codesandboxUrl),
  });
  window.open(newIssueUrl, '_blank');
};

const LivePreview: React.FunctionComponent<DocsStoryProps & { componentName: string }> = ({ id, componentName }) => {
  const [renderMode, setRenderMode] = React.useState<'storybook' | 'sandpack'>('storybook');
  const [isReportBugLoading, setReportBugLoading] = React.useState(false);
  const sandpack = useSandpack();

  React.useEffect(() => {
    if (id) {
      const anchor = document.getElementById(`anchor--${id}`);
      const iframe = anchor?.querySelector('iframe');

      // toggle iframe/inline rendering
      if (iframe) {
        iframe.style.display = 'none';

        return sandpack.listen(msg => {
          if (msg.type === 'start') {
            iframe.style.display = 'block';
            setRenderMode('sandpack');
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <SandpackPreview
      actionsChildren={
        <button
          type="button"
          className="sp-button"
          style={{ padding: 'var(--sp-space-1) var(--sp-space-3)' }}
          onClick={handleReportBug(componentName, setReportBugLoading)}
        >
          {isReportBugLoading ? 'Loading' : 'Report bug'}
        </button>
      }
    >
      <>{renderMode === 'storybook' && <Story id={id} />}</>
    </SandpackPreview>
  );
};

export const FluentDocsDocsStory: React.FunctionComponent<
  DocsStoryProps & { componentName: string; fluentThemeExportName: string }
> = ({ id, name, expanded = true, withToolbar = false, parameters = {}, componentName, fluentThemeExportName }) => {
  if (!name) {
    return null;
  }

  const { docs } = parameters;
  const storyName = name.replace(new RegExp(' ', 'g'), '');

  return (
    <Anchor storyId={id ?? ''}>
      {expanded && name && <Subheading>{name}</Subheading>}
      {expanded && docs && docs.description?.story && <Description markdown={docs.description?.story} />}
      <div className="sbdocs sbdocs-preview">
        <SandpackProvider
          css={{ width: 'fit-content' }}
          template="react-ts"
          // The following line sets bundler to a beta version. It speeds up the bundling time from
          // cca 1 minute to cca 10 seconds. More info: https://github.com/codesandbox/sandpack/discussions/416
          // We don't use it, because as Sandpack is developing it, new bugs are being introduced and live edit
          // stops working without any change on our side.
          // It can be fixed by self-hosting the bundler and testing after each update.
          // bundlerURL="https://sandpack-bundler.pages.dev"
          openPaths={['/example.tsx']}
          customSetup={{
            environment: 'create-react-app-typescript',
            entry: '/index.tsx',
            main: '/example.tsx',
            files: {
              '/example.tsx': removeStoryConfiguration(storyName, parameters.fullSource),
              '/index.html': '<div id="root"></div>',
              '/index.tsx': {
                // use originalStoryFn because users can override the `storyName` property.
                // We need the name of the exported function, not the actual story
                // https://github.com/microsoft/fluentui-storybook-addons/issues/12
                code: dedent`
            import * as React from 'react';
            import * as ReactDOM from 'react-dom';
            import { FluentProvider, FLUENT_THEME_EXPORT_NAME } from '@fluentui/react-components';
            import { STORY_NAME as Example } from './example';
            //
            // You can edit this example in "example.tsx".
            //
            ReactDOM.render(
                <FluentProvider theme={FLUENT_THEME_EXPORT_NAME}>
                    <Example />
                </FluentProvider>,
                document.getElementById('root'),
            );`
                  .replace('STORY_NAME', storyName)
                  .replace('FLUENT_THEME_EXPORT_NAME', fluentThemeExportName)
                  .replace('FLUENT_THEME_EXPORT_NAME', fluentThemeExportName),
              },
            },
            dependencies: {
              react: '^17.0.0',
              'react-dom': '^17.0.0',
              'react-scripts': '^4.0.0',
              '@fluentui/react-components': packageJson.version, // necessary for FluentProvider
            },
          }}
          autorun={false}
        >
          <SandpackThemeProvider
            theme={{
              ...githubLightTheme,
              palette: {
                activeBackground: '#fafafa',
              },
            }}
          >
            <LivePreview id={id} componentName={componentName} />
            <SandpackCodeEditor wrapContent={true} initMode={'lazy'} showInlineErrors={true} />
          </SandpackThemeProvider>
        </SandpackProvider>
      </div>
    </Anchor>
  );
};
