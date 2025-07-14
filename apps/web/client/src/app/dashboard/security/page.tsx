'use client';

import { DashboardLayout } from '../_components/dashboard-layout';
import { SecuritySuite } from './_components/security-suite';

export default function SecurityPage() {
    return (
        <DashboardLayout>
            <SecuritySuite />
        </DashboardLayout>
    );
}