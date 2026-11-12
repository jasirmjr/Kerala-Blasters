import React, { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-linked "architecture studio" motion kit (Dev.UN-style reference).
 * Everything here is driven by scroll position (not one-shot triggers), so it
 * plays forwards when scrolling down and reverses when scrolling back up.
 *
 * Uses useScroll on the element's layout position — no IntersectionObserver —
 * so hidden/offscreen starting states can never get "stuck".
 */

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];

/** Progress 0→1 while the element travels from `startPct` to `endPct` of the viewport height. */
function useEnterProgress(ref: React.RefObject<HTMLElement | null>, startPct = 100, endPct = 55): MotionValue<number> {
  const offset = [`start ${startPct}%`, `start ${endPct}%`] as unknown as ScrollOffset;
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return scrollYProgress;
}

/* ------------------------------------------------------------------ */
/* SplitHeading — two lines that start at opposite screen edges and    */
/* glide together into a staggered layout ("OUR / SERVICES").          */
/* ------------------------------------------------------------------ */

interface SplitHeadingProps {
  first: React.ReactNode;
  second: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Indent of the second line once settled (CSS length). */
  indent?: string;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
}

export const SplitHeading: React.FC<SplitHeadingProps> = ({
  first,
  second,
  className = '',
  style,
  indent = '1.4em',
  align = 'left',
  as = 'h2',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const p = useEnterProgress(ref, 100, 40);

  const x1 = useTransform(p, [0, 1], ['-35vw', '0vw']);
  const x2 = useTransform(p, [0, 1], ['35vw', '0vw']);
  const opacity = useTransform(p, [0, 0.35], [0, 1]);

  const Tag = as;
  const lineCls = align === 'center' ? 'block text-center' : 'block';

  return (
    // No clipping here: words fly in from the screen edges; the parent <section> clips overflow.
    <div ref={ref}>
      <Tag className={className} style={style}>
        <motion.span className={lineCls} style={reduce ? undefined : { x: x1, opacity }}>
          {first}
        </motion.span>
        <motion.span
          className={lineCls}
          style={{
            paddingLeft: align === 'left' ? indent : undefined,
            ...(reduce ? {} : { x: x2, opacity }),
          }}
        >
          {second}
        </motion.span>
      </Tag>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* SlideIn — content glides in from a side as it scrolls into view.    */
/* ------------------------------------------------------------------ */

interface SlideInProps {
  children: React.ReactNode;
  from?: 'left' | 'right' | 'bottom';
  distance?: number;
  /** Stagger: each step makes the element arrive a little later in the scroll. */
  lag?: number;
  className?: string;
  onClick?: () => void;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  from = 'bottom',
  distance = 140,
  lag = 0,
  className,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const shift = Math.min(lag * 6, 30);
  const p = useEnterProgress(ref, 100 - shift * 0.3, 60 - shift);

  const sign = from === 'left' ? -1 : 1;
  const offset = useTransform(p, [0, 1], [distance * (from === 'bottom' ? 1 : sign), 0]);
  const opacity = useTransform(p, [0, 0.6], [0, 1]);

  const style = reduce ? undefined : from === 'bottom' ? { y: offset, opacity } : { x: offset, opacity };

  return (
    <motion.div ref={ref} className={className} style={style} onClick={onClick}>
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* FramedMedia — thin offset outline frame behind a media card, with   */
/* the frame and the media drifting apart slightly (parallax).         */
/* ------------------------------------------------------------------ */

interface FramedMediaProps {
  children: React.ReactNode;
  /** Tailwind border colour class for the outline frame. */
  frameClassName?: string;
  /** Which corner the frame pokes out from. */
  corner?: 'top-left' | 'top-right';
  className?: string;
}

export const FramedMedia: React.FC<FramedMediaProps> = ({
  children,
  frameClassName = 'border-white/25',
  corner = 'top-left',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const frameY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const pos = corner === 'top-left' ? '-top-4 -left-4 sm:-top-5 sm:-left-5' : '-top-4 -right-4 sm:-top-5 sm:-right-5';

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        aria-hidden
        className={`absolute ${pos} w-full h-full border pointer-events-none rounded-2xl sm:rounded-3xl ${frameClassName}`}
        style={reduce ? undefined : { y: frameY }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* VerticalOutlineText — huge outlined vertical word on the side that  */
/* drifts with scroll ("D E V . U N" in the reference).                */
/* ------------------------------------------------------------------ */

interface VerticalOutlineTextProps {
  text: string;
  side?: 'left' | 'right';
  /** CSS colour of the outline stroke. */
  stroke?: string;
}

export const VerticalOutlineText: React.FC<VerticalOutlineTextProps> = ({
  text,
  side = 'left',
  stroke = 'rgba(255,255,255,0.12)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['25%', '-25%']);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`hidden lg:flex absolute inset-y-0 ${side === 'left' ? 'left-2' : 'right-2'} items-center pointer-events-none select-none`}
    >
      <motion.span
        className="font-display font-black uppercase leading-none tracking-[0.35em] text-[7rem] xl:text-[8.5rem]"
        style={{
          writingMode: 'vertical-rl',
          color: 'transparent',
          WebkitTextStroke: `1.5px ${stroke}`,
          ...(reduce ? {} : { y }),
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};
