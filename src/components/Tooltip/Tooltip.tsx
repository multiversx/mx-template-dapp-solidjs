import classNames from 'classnames';

import { createSignal, JSX } from 'solid-js';

import { IPropsWithClass, IPropsWithChildren } from 'types';

interface TooltipPropsType extends IPropsWithChildren, IPropsWithClass {
  trigger: (isTooltipVisible: boolean) => JSX.Element;
  triggerOnClick?: boolean;
  position?: 'top' | 'bottom';
}

// prettier-ignore
const styles = {
  tooltip: 'tooltip flex relative',
  tooltipContentWrapper: 'tooltip-content-wrapper left-1/2 -translate-x-1/2 absolute z-10',
  tooltipContentWrapperTop: 'bottom-full pb-3',
  tooltipContentWrapperBottom: 'top-full pt-3',
  tooltipContent: 'tooltip-content flex-row text-left text-xs gap-1 cursor-default bg-primary rounded-xl border border-secondary p-1 relative after:w-2 after:h-2 after:border after:border-secondary after:bg-primary after:absolute after:left-1/2 after:origin-center after:-translate-x-1/2 after:-rotate-45 transition-all duration-200 ease-out',
  tooltipContentTop: 'after:-bottom-1 after:border-t-0 after:border-r-0',
  tooltipContentBottom: 'after:-top-1 after:border-b-0 after:border-l-0',
  tooltipTrigger: 'tooltip-trigger'
} satisfies Record<string, string>;

export const Tooltip = ({
  position = 'top',
  triggerOnClick = false,
  class: className,
  children,
  trigger
}: TooltipPropsType) => {
  const [isTooltipVisible, setIsTooltipVisible] = createSignal(false);

  const handleTriggerClick = (event: MouseEvent) => {
    if (!triggerOnClick) {
      return;
    }

    event.preventDefault();
    setIsTooltipVisible(!isTooltipVisible());
  };

  const handleBlur = (event: FocusEvent) => {
    if (
      !(event.currentTarget as HTMLElement)?.contains(
        event.relatedTarget as Node
      )
    ) {
      setIsTooltipVisible(false);
    }
  };

  const handleMouseEnter = (event: MouseEvent) => {
    if (triggerOnClick) {
      return;
    }

    event.preventDefault();
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = (event: MouseEvent) => {
    if (triggerOnClick) {
      return;
    }

    event.preventDefault();
    setIsTooltipVisible(false);
  };

  return (
    <div
      onClick={handleTriggerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      class={classNames(styles.tooltip, className)}
    >
      {isTooltipVisible() && (
        <div
          class={classNames(
            styles.tooltipContentWrapper,
            { [styles.tooltipContentWrapperTop]: position === 'top' },
            { [styles.tooltipContentWrapperBottom]: position === 'bottom' }
          )}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            onBlur={handleBlur}
            tabIndex={-1}
            class={classNames(
              styles.tooltipContent,
              { [styles.tooltipContentTop]: position === 'top' },
              { [styles.tooltipContentBottom]: position === 'bottom' }
            )}
          >
            {children}
          </div>
        </div>
      )}

      <span class={styles.tooltipTrigger}>{trigger(isTooltipVisible())}</span>
    </div>
  );
};
