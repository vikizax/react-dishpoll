import { styled } from '@mui/material/styles';
import { APP_BAR_HEIGHT } from '../../../constants';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,0.1)',
    height: `calc(100vh - ${APP_BAR_HEIGHT + 12}px)`,
    padding: 14
})