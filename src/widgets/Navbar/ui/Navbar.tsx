import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
    <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.links}>
            <AppLink theme={AppLinkTheme.SECONDARY} to='/' className={cls.mainLink}>
                Main
            </AppLink>
            <AppLink theme={AppLinkTheme.RED} to='/about' className={cls.aboutLink}>
                About
            </AppLink>
        </div>
    </div>
);
