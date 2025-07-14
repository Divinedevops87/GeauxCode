'use client';

import { DashboardLayout } from '../_components/dashboard-layout';
import { CodePlayground } from './_components/code-playground';

export default function PlaygroundPage() {
    return (
        <DashboardLayout>
            <CodePlayground />
        </DashboardLayout>
    );
}