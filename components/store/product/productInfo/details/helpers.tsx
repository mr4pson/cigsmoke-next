import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';
import { useState } from 'react';

const ImageTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color.textPrimary,
    color: color.btnPrimary,
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'intro',
    boxShadow: `0px 2px 6px ${color.boxShadowBtn}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '15px',
    padding: '15px',
  },
}));

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText]: [any, any] = useState(false);

  const copy = async (text: any) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(false);
      return false;
    }
  };

  return [copiedText, setCopiedText, copy];
};

const handleMobileShare = async (shareData: any) => {
  try {
    await navigator.share(shareData);
  } catch (err) {
    console.warn('share failed', err);
  }
};

export { ImageTooltip, useCopyToClipboard, handleMobileShare };
