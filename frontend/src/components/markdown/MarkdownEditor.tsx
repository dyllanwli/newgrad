import React from 'react';
import { TabGroup, TabList, TabPanel, TabPanels, Tab, Textarea } from '@headlessui/react'
import MarkdownViewer from './MarkdownViewer';

interface MarkdownEditorProps {
    value: string;
    onChange?: (value: string) => void;
    className?: string;
    maxLength?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, className, maxLength }) => {
    return (
        <div className={`relative ${className}`}>
            <TabGroup>
                <TabList className="flex absolute right-2 -mt-7">
                    <Tab className={({ selected }) =>
                        `px-4 py-1 text-sm font-medium leading-5 text-purple-700 rounded-t-lg
                        ${selected ? 'bg-white shadow' : 'text-purple-500 hover:bg-white/[0.12] hover:text-purple-600'}
                        focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60`
                    }>
                        Markdown
                    </Tab>
                    <Tab className={({ selected }) =>
                        `px-4 py-1 text-sm font-medium leading-5 text-purple-700 rounded-t-lg ml-[-0.5rem]
                        ${selected ? 'bg-white shadow' : 'text-purple-500 hover:bg-white/[0.12] hover:text-purple-600'}
                        focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60`
                    }>
                        Preview
                    </Tab>
                </TabList>
                <TabPanels className="mt-2">
                    <TabPanel>
                        <Textarea
                            name="description"
                            value={value}
                            maxLength={maxLength}
                            onChange={(e) => onChange && onChange(e.target.value)}
                            className="w-full border rounded-lg p-2 pt-2"
                            style={{ minHeight: '100px', resize: 'vertical' }}
                            rows={1}
                            onInput={(e) => {
                                e.currentTarget.style.height = 'auto';
                                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <div className="border rounded pt-2 min-h-[100px]">
                            <MarkdownViewer content={value} className="scale-75" />
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
};

export default MarkdownEditor;