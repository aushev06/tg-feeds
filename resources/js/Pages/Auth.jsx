import React, {useEffect} from "react";

export default function Auth() {
    useEffect(() => {
        try {
            let params = new URLSearchParams(window.location.search)

            const token = params.getAll('token')[0] || '';

            if (token) {
                localStorage.setItem('token', token);
            }
        } catch (e) {
            //
        }

        window.close();
    })

    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
            window.close()
        `,
            }}
        />
    );
}
