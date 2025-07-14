'use client';

import { DashboardLayout } from '../_components/dashboard-layout';
import { PortfolioGenerator } from './_components/portfolio-generator';

export default function PortfolioGeneratorPage() {
    return (
        <DashboardLayout>
            <PortfolioGenerator />
        </DashboardLayout>
    );
}