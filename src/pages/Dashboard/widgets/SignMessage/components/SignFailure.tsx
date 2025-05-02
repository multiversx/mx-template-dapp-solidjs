export const SignFailure = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <div class='flex flex-col'>
      <p>Message could not be signed</p>
      <p class='flex gap-1'>
        Reason: <span>{errorMessage ?? '-'}</span>
      </p>
    </div>
  );
};
