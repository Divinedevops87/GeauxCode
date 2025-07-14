'use client';

import { DashboardLayout } from '../_components/dashboard-layout';
import { FileManager } from './_components/file-manager';

export default function FileManagerPage() {
    return (
        <DashboardLayout>
            <FileManager />
        </DashboardLayout>
    );
}