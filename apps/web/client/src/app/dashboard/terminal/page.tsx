'use client';

import { DashboardLayout } from '../_components/dashboard-layout';
import { Terminal } from './_components/terminal';

export default function TerminalPage() {
    return (
        <DashboardLayout>
            <Terminal />
        </DashboardLayout>
    );
}