import { useMemo } from 'react';
import styled from 'styled-components';
import { ReactComponent as Checkbox } from '../asset/svg/Checkbox.svg';
import { ReactComponent as CheckboxChecked } from '../asset/svg/CheckboxChecked.svg';
import { ReactComponent as CouponLogo } from '../asset/svg/CouponLogo.svg';

export default function CouponItem({
  onClick,
  disabled,
  checked,
  title,
  expireText,
  tipText,
}) {
  const checkboxContent = useMemo(() => {
    if (!onClick) {
      return null;
    }
    return checked ? <CheckboxChecked /> : <Checkbox />;
  });

  return (
    <Container onClick={onClick} className={disabled ? 'disabled' : ''}>
      {checkboxContent}
      <CouponBox>
        <CouponLogo />
        <CouponBoxContent>
          <CouponTitle>{title}</CouponTitle>
          <div>
            <CouponExpireText>{expireText}</CouponExpireText>
            <CouponTipText>{tipText}</CouponTipText>
          </div>
        </CouponBoxContent>
      </CouponBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  > svg {
    padding: 15px;
  }

  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
  }
`;

const CouponBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #eb8888;
  border-radius: 3px;
  padding: 10px 12px;
`;

const CouponBoxContent = styled.div`
  width: 100%;
`;

const CouponTitle = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #eb8888;
  margin-bottom: 4px;
`;

const CouponExpireText = styled.span`
  font-size: 10px;
  color: #777777;
  margin-right: 4px;
`;

const CouponTipText = styled.span`
  font-weight: 400;
  font-size: 6px;
  color: #777777;
`;
