import { safeWindow } from '@multiversx/sdk-dapp';
import githubLogo from 'assets/github-logo.svg';
import { Button } from 'components';
import { GITHUB_REPO } from 'localConstants';

export const GitHubButton = () => {
  const handleOpenGitHubRepo = () => {
    safeWindow?.open(GITHUB_REPO);
  };

  return (
    <Button
      onClick={handleOpenGitHubRepo}
      class='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
    >
      <div class='h-3.5 w-3.5 fill-gray-600'>{githubLogo}</div>
    </Button>
  );
};
