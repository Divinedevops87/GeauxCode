'use client';

import { DashboardLayout } from '../_components/dashboard-layout';
import { DatabaseManager } from './_components/database-manager';

export default function DatabasePage() {
    return (
        <DashboardLayout>
            <DatabaseManager />
        </DashboardLayout>
    );
}